package com.tourbot.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "tours")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String destination;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String duration;

    private String difficulty;

    private Double rating;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "gallery_images", columnDefinition = "TEXT")
    private String galleryImages; // JSON array stored as string

    @Column(columnDefinition = "TEXT")
    private String highlights; // JSON array stored as string

    @Column(name = "best_for", columnDefinition = "TEXT")
    private String bestFor; // JSON array stored as string

    @Column(columnDefinition = "TEXT")
    private String categories; // JSON array stored as string

    @Column(columnDefinition = "TEXT")
    private String includes; // JSON array stored as string

    @Column(name = "max_group_size")
    private Integer maxGroupSize;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "best_season")
    private String bestSeason;

    private Boolean active = true;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;
}
