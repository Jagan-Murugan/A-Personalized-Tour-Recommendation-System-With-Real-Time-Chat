package com.tourbot.dto;

import com.tourbot.entity.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private String bookingId;
    private Long userId;
    private String userName;
    private Long tourId;
    private String tourName;
    private String tourDestination;
    private String tourImage;
    private String tourDuration;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String nationality;

    private LocalDate travelDate;
    private Integer numberOfTravelers;
    private String travelStyle;
    private String accommodationType;
    private String dietaryRequirements;
    private String specialRequests;

    private String emergencyContactName;
    private String emergencyContactRelationship;
    private String emergencyContactPhone;

    private String cardHolderName;
    private String cardLastFour;
    private String billingAddress;
    private String billingCity;
    private String billingZip;
    private String billingCountry;

    private BigDecimal totalAmount;
    private String status;
    private LocalDateTime createdAt;

    public static BookingDTO fromEntity(Booking booking) {
        return BookingDTO.builder()
                .id(booking.getId())
                .bookingId(booking.getBookingId())
                .userId(booking.getUser().getId())
                .userName(booking.getUser().getName())
                .tourId(booking.getTour().getId())
                .tourName(booking.getTour().getName())
                .tourDestination(booking.getTour().getDestination())
                .tourImage(booking.getTour().getImageUrl())
                .tourDuration(booking.getTour().getDuration())
                .firstName(booking.getFirstName())
                .lastName(booking.getLastName())
                .email(booking.getEmail())
                .phone(booking.getPhone())
                .dateOfBirth(booking.getDateOfBirth())
                .nationality(booking.getNationality())
                .travelDate(booking.getTravelDate())
                .numberOfTravelers(booking.getNumberOfTravelers())
                .travelStyle(booking.getTravelStyle())
                .accommodationType(booking.getAccommodationType())
                .dietaryRequirements(booking.getDietaryRequirements())
                .specialRequests(booking.getSpecialRequests())
                .emergencyContactName(booking.getEmergencyContactName())
                .emergencyContactRelationship(booking.getEmergencyContactRelationship())
                .emergencyContactPhone(booking.getEmergencyContactPhone())
                .cardHolderName(booking.getCardHolderName())
                .cardLastFour(booking.getCardLastFour())
                .billingAddress(booking.getBillingAddress())
                .billingCity(booking.getBillingCity())
                .billingZip(booking.getBillingZip())
                .billingCountry(booking.getBillingCountry())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus().name())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
