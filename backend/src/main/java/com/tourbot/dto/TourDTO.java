package com.tourbot.dto;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tourbot.entity.Tour;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TourDTO {
    private Long id;
    private String name;
    private String destination;
    private String description;
    private BigDecimal price;
    private String duration;
    private String difficulty;
    private Double rating;
    private String imageUrl;
    private List<String> galleryImages;
    private List<String> highlights;
    private List<String> bestFor;
    private List<String> categories;
    private List<String> includes;
    private Integer maxGroupSize;
    private Integer minAge;
    private String bestSeason;
    private List<ReviewDTO> reviews;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static TourDTO fromEntity(Tour tour) {
        return TourDTO.builder()
                .id(tour.getId())
                .name(tour.getName())
                .destination(tour.getDestination())
                .description(tour.getDescription())
                .price(tour.getPrice())
                .duration(tour.getDuration())
                .difficulty(tour.getDifficulty())
                .rating(tour.getRating())
                .imageUrl(tour.getImageUrl())
                .galleryImages(parseJsonArray(tour.getGalleryImages()))
                .highlights(parseJsonArray(tour.getHighlights()))
                .bestFor(parseJsonArray(tour.getBestFor()))
                .categories(parseJsonArray(tour.getCategories()))
                .includes(parseJsonArray(tour.getIncludes()))
                .maxGroupSize(tour.getMaxGroupSize())
                .minAge(tour.getMinAge())
                .bestSeason(tour.getBestSeason())
                .reviews(tour.getReviews() != null ? 
                        tour.getReviews().stream().map(ReviewDTO::fromEntity).toList() : 
                        new ArrayList<>())
                .build();
    }

    private static List<String> parseJsonArray(String json) {
        if (json == null || json.isEmpty()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
