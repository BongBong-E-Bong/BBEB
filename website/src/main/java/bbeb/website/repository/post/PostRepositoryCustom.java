package bbeb.website.repository.post;

import bbeb.website.dto.PostDTO;
import org.springframework.data.domain.Page;

public interface PostRepositoryCustom {
    PostDTO.PostResponseDTO findOneRequestDTOByMemberAndPost(Long postId);
    Page<PostDTO.PostAllResponseDTO> searchAll(PostDTO.PostAllRequestDTO dto);

    Page<PostDTO.PostAllResponseDTO> searchAllByTitle(PostDTO.PostAllRequestDTO dto);

    Page<PostDTO.PostAllResponseDTO> searchAllByNickname(PostDTO.PostAllRequestDTO dto);

    Page<PostDTO.PostAllResponseDTO> searchAllByContent(PostDTO.PostAllRequestDTO dto);

    Page<PostDTO.PostAllResponseDTO> searchAllByTag(PostDTO.PostAllRequestDTO dto);
}
