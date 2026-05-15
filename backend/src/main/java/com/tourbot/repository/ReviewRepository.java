package com.tourbot.repository;

import com.tourbot.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTourIdOrderByCreatedAtDesc(Long tourId);
    
    List<Review> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.tour.id = :tourId")
    Double getAverageRatingByTourId(@Param("tourId") Long tourId);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.tour.id = :tourId")
    Long getReviewCountByTourId(@Param("tourId") Long tourId);
}
