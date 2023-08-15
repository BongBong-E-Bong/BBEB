package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.domain.member.Member;
import bbeb.website.domain.member.Profile;
import bbeb.website.dto.ProfileDTO;
import bbeb.website.repository.member.MemberRepository;
import bbeb.website.repository.profile.ProfileRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import static bbeb.website.config.exception.ErrorCode.BadRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket.profile}")
    private String profileBucketName;

    public ProfileDTO.ProfileResponseDTO uploadProfile(ProfileDTO.ProfileRequestDTO dto,
                                                       String loginId) throws IOException {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(BadRequest));


        MultipartFile file = dto.getProfile();

        UUID uuid = UUID.randomUUID();

        String imageFileName = uuid + "_" + file.getOriginalFilename();

        File destinationFile = new File(imageFileName);

        if(destinationFile.createNewFile()) {
            try(FileOutputStream fos = new FileOutputStream(imageFileName)) {
                fos.write(file.getBytes());
            }
        }

        Profile profile = member.getProfile();

        if (profile != null) {
            s3Client.deleteObject(new DeleteObjectRequest(profileBucketName, profile.getUrl()));

            profile.updateUrl(imageFileName);

            s3Client.putObject(new PutObjectRequest(profileBucketName, profile.getUrl(), destinationFile));
        } else {
            profile = Profile.builder()
                    .member(member)
                    .url(imageFileName)
                    .build();

            member.setProfile(profile);

            s3Client.putObject(new PutObjectRequest(profileBucketName, profile.getUrl(), destinationFile));
        }

        profileRepository.save(profile);

        destinationFile.delete();
        ProfileDTO.ProfileResponseDTO responseDTO = new ProfileDTO.ProfileResponseDTO();
        responseDTO.setUrl(profile.getUrl());

        return responseDTO;
    }

    public ProfileDTO.ProfileResponseDTO getProfile(String loginId){
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(BadRequest));

        Profile profile = member.getProfile();

        ProfileDTO.ProfileResponseDTO dto = new ProfileDTO.ProfileResponseDTO();

        String url;

        if (profile != null) {
            url = s3Client.getUrl(profileBucketName, profile.getUrl()).toString();
        }
        else {
            url = s3Client.getUrl(profileBucketName, "default.jpg").toString();
        }

        dto.setUrl(url);

        return dto;
    }
}
