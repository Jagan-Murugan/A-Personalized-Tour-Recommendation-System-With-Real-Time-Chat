package com.tourbot.dto;

import com.tourbot.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long id;
    private Long tourId;
    private Long userId;
    private String reviewerName;
    private String reviewerAvatar;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public static ReviewDTO fromEntity(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .tourId(review.getTour().getId())
                .userId(review.getUser() != null ? review.getUser().getId() : null)
                .reviewerName(review.getReviewerName())
                .reviewerAvatar(review.getReviewerAvatar())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
