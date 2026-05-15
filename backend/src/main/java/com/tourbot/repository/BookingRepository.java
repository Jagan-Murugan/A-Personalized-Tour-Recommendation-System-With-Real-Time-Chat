package com.tourbot.repository;

import com.tourbot.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingId(String bookingId);
    
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Booking> findByTourIdOrderByCreatedAtDesc(Long tourId);
    
    List<Booking> findByStatus(Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b ORDER BY b.createdAt DESC")
    List<Booking> findAllOrderByCreatedAtDesc();
    
    @Query("SELECT b FROM Booking b WHERE b.firstName LIKE %:search% OR b.lastName LIKE %:search% OR b.email LIKE %:search% OR b.bookingId LIKE %:search%")
    List<Booking> searchBookings(@Param("search") String search);
    
    @Query("SELECT SUM(b.totalAmount) FROM Booking b WHERE b.status = 'CONFIRMED'")
    BigDecimal getTotalRevenue();
    
    @Query("SELECT SUM(b.numberOfTravelers) FROM Booking b WHERE b.status = 'CONFIRMED'")
    Long getTotalTravelers();
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.createdAt >= :startDate")
    Long getBookingCountSince(@Param("startDate") LocalDateTime startDate);
}
