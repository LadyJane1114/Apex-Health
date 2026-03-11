package com.apexhealth.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "studies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String year;
    private String studyType;       // e.g. "Cohort", "RCT", "Survey"
    private String targetPopulation; // e.g. "Indigenous", "Low-Income", "Elderly"
    private String status;           // e.g. "Active", "Completed", "Proposed"

    // SDOH alignment scores (0-100 for each of 14 determinants)
    private int scoreIncome;
    private int scoreEducation;
    private int scoreUnemployment;
    private int scoreEmploymentConditions;
    private int scoreEarlyChildhood;
    private int scoreFoodInsecurity;
    private int scoreHousing;
    private int scoreSocialExclusion;
    private int scoreSocialSafety;
    private int scoreHealthServices;
    private int scoreIndigenousStatus;
    private int scoreGender;
    private int scoreRace;
    private int scoreDisability;

    // Overall SDOH alignment score (average)
    private double overallSdohScore;

    private String description;
}
