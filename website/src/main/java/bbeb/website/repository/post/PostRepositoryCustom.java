package bbeb.website.repository.post;

import bbeb.website.dto.PostDTO;

public interface PostRepositoryCustom {
    PostDTO.PostResponseDTO findOneRequestDTOByMemberAndPost(Long postId);
}
