package com.tourbot.repository;

import com.tourbot.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    List<Tour> findByActiveTrue();
    
    List<Tour> findByDestinationContainingIgnoreCase(String destination);
    
    List<Tour> findByNameContainingIgnoreCaseOrDestinationContainingIgnoreCase(String name, String destination);
    
    @Query("SELECT t FROM Tour t WHERE t.active = true AND t.price BETWEEN :minPrice AND :maxPrice")
    List<Tour> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice);
    
    @Query("SELECT t FROM Tour t WHERE t.active = true AND t.categories LIKE %:category%")
    List<Tour> findByCategory(@Param("category") String category);
    
    @Query("SELECT t FROM Tour t WHERE t.active = true AND t.difficulty = :difficulty")
    List<Tour> findByDifficulty(@Param("difficulty") String difficulty);
    
    @Query("SELECT t FROM Tour t WHERE t.active = true ORDER BY t.rating DESC")
    List<Tour> findTopRatedTours();
}
