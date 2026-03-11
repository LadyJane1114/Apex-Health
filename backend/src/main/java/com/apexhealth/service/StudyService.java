package com.apexhealth.service;

import com.apexhealth.model.Study;
import com.apexhealth.repository.StudyRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudyService {

    @Autowired
    private StudyRepository studyRepository;

    // The 14 Canadian SDOH determinants
    public static final List<String> SDOH_CATEGORIES = Arrays.asList(
        "Income & Distribution",
        "Education",
        "Unemployment & Job Security",
        "Employment Conditions",
        "Early Childhood Development",
        "Food Insecurity",
        "Housing",
        "Social Exclusion",
        "Social Safety Network",
        "Health Services",
        "Indigenous Status",
        "Gender",
        "Race",
        "Disability"
    );

    public static final List<String> POPULATIONS = Arrays.asList(
        "Indigenous", "Low-Income", "Elderly", "Children", "Women",
        "Immigrants", "LGBTQ+", "Disability", "General Population", "Racialized Groups"
    );

    @PostConstruct
    public void seedData() {
        if (studyRepository.count() == 0) {
            List<Study> studies = new ArrayList<>();

            studies.add(createStudy(
                "Housing Instability and Mental Health Outcomes in Urban Indigenous Communities",
                "Dr. Sarah Redcloud", "2023", "Cohort Study", "Indigenous", "Active",
                new int[]{75, 60, 55, 50, 70, 65, 95, 85, 80, 70, 95, 60, 90, 55},
                "Examines the relationship between housing instability and mental health in urban Indigenous populations."
            ));

            studies.add(createStudy(
                "Food Security Interventions Among Low-Income Families in Nova Scotia",
                "Dr. James Tompkins", "2023", "RCT", "Low-Income", "Active",
                new int[]{85, 70, 75, 65, 80, 95, 70, 75, 85, 65, 45, 55, 60, 50},
                "Evaluates community-based food security programs and their impact on family health outcomes."
            ));

            studies.add(createStudy(
                "Early Childhood Development Programs: Racial Disparities in Access",
                "Dr. Amara Diallo", "2022", "Cross-Sectional", "Racialized Groups", "Completed",
                new int[]{80, 85, 60, 55, 95, 75, 65, 80, 70, 75, 70, 65, 90, 60},
                "Investigates racial disparities in access to early childhood development programs."
            ));

            studies.add(createStudy(
                "Gender-Based Employment Barriers in Healthcare Sector",
                "Dr. Priya Nair", "2023", "Survey", "Women", "Active",
                new int[]{70, 80, 85, 90, 50, 45, 55, 75, 70, 80, 50, 95, 75, 55},
                "Examines gender-based employment barriers among healthcare workers."
            ));

            studies.add(createStudy(
                "Disability and Social Exclusion: Community Integration Programs",
                "Dr. Michael Chen", "2022", "Mixed Methods", "Disability", "Completed",
                new int[]{65, 70, 75, 70, 60, 55, 75, 90, 85, 80, 55, 70, 65, 95},
                "Evaluates social integration programs for people with disabilities."
            ));

            studies.add(createStudy(
                "Income Inequality and Preventable Hospitalizations",
                "Dr. Emma Laurent", "2024", "Retrospective", "General Population", "Proposed",
                new int[]{95, 75, 80, 70, 65, 80, 75, 70, 85, 90, 60, 55, 70, 60},
                "Analyzes the relationship between income inequality and rates of preventable hospitalizations."
            ));

            studies.add(createStudy(
                "Immigrant Health Outcomes and Social Safety Net Access",
                "Dr. Rahim Chowdhury", "2023", "Cohort Study", "Immigrants", "Active",
                new int[]{85, 80, 90, 75, 70, 75, 80, 85, 90, 80, 55, 65, 85, 60},
                "Studies health outcomes for recent immigrants and their access to social safety programs."
            ));

            studies.add(createStudy(
                "Elderly Care: Employment Conditions of Personal Support Workers",
                "Dr. Carol MacPherson", "2022", "Survey", "Elderly", "Completed",
                new int[]{75, 65, 80, 95, 70, 60, 65, 70, 75, 85, 55, 75, 70, 65},
                "Evaluates working conditions and burnout among personal support workers in elderly care."
            ));

            studyRepository.saveAll(studies);
        }
    }

    private Study createStudy(String title, String author, String year, String studyType,
                               String population, String status, int[] scores, String description) {
        Study s = new Study();
        s.setTitle(title);
        s.setAuthor(author);
        s.setYear(year);
        s.setStudyType(studyType);
        s.setTargetPopulation(population);
        s.setStatus(status);
        s.setDescription(description);

        s.setScoreIncome(scores[0]);
        s.setScoreEducation(scores[1]);
        s.setScoreUnemployment(scores[2]);
        s.setScoreEmploymentConditions(scores[3]);
        s.setScoreEarlyChildhood(scores[4]);
        s.setScoreFoodInsecurity(scores[5]);
        s.setScoreHousing(scores[6]);
        s.setScoreSocialExclusion(scores[7]);
        s.setScoreSocialSafety(scores[8]);
        s.setScoreHealthServices(scores[9]);
        s.setScoreIndigenousStatus(scores[10]);
        s.setScoreGender(scores[11]);
        s.setScoreRace(scores[12]);
        s.setScoreDisability(scores[13]);

        double avg = Arrays.stream(scores).average().orElse(0);
        s.setOverallSdohScore(Math.round(avg * 10.0) / 10.0);

        return s;
    }

    public List<Study> getAllStudies() {
        return studyRepository.findAll();
    }

    public List<Study> filterStudies(String population, String status, String sdoh, Double minScore) {
        List<Study> studies = studyRepository.findAll();

        if (population != null && !population.isBlank()) {
            studies = studies.stream()
                .filter(s -> s.getTargetPopulation().toLowerCase().contains(population.toLowerCase()))
                .collect(Collectors.toList());
        }

        if (status != null && !status.isBlank()) {
            studies = studies.stream()
                .filter(s -> s.getStatus().equalsIgnoreCase(status))
                .collect(Collectors.toList());
        }

        if (minScore != null) {
            studies = studies.stream()
                .filter(s -> s.getOverallSdohScore() >= minScore)
                .collect(Collectors.toList());
        }

        return studies;
    }

    public Map<String, Object> getKpis() {
        List<Study> all = studyRepository.findAll();
        Map<String, Object> kpis = new LinkedHashMap<>();
        kpis.put("totalStudies", all.size());
        kpis.put("activeStudies", all.stream().filter(s -> "Active".equalsIgnoreCase(s.getStatus())).count());
        kpis.put("completedStudies", all.stream().filter(s -> "Completed".equalsIgnoreCase(s.getStatus())).count());
        double avgSdoh = all.stream().mapToDouble(Study::getOverallSdohScore).average().orElse(0);
        kpis.put("averageSdohAlignment", Math.round(avgSdoh * 10.0) / 10.0);
        kpis.put("totalPopulationsServed",
            all.stream().map(Study::getTargetPopulation).collect(Collectors.toSet()).size());
        return kpis;
    }

    public List<Map<String, Object>> getSdohAggregates() {
        List<Study> all = studyRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        String[] fields = {
            "income","education","unemployment","employmentConditions",
            "earlyChildhood","foodInsecurity","housing","socialExclusion",
            "socialSafety","healthServices","indigenousStatus","gender","race","disability"
        };

        int[][] scores = {
            all.stream().mapToInt(Study::getScoreIncome).toArray(),
            all.stream().mapToInt(Study::getScoreEducation).toArray(),
            all.stream().mapToInt(Study::getScoreUnemployment).toArray(),
            all.stream().mapToInt(Study::getScoreEmploymentConditions).toArray(),
            all.stream().mapToInt(Study::getScoreEarlyChildhood).toArray(),
            all.stream().mapToInt(Study::getScoreFoodInsecurity).toArray(),
            all.stream().mapToInt(Study::getScoreHousing).toArray(),
            all.stream().mapToInt(Study::getScoreSocialExclusion).toArray(),
            all.stream().mapToInt(Study::getScoreSocialSafety).toArray(),
            all.stream().mapToInt(Study::getScoreHealthServices).toArray(),
            all.stream().mapToInt(Study::getScoreIndigenousStatus).toArray(),
            all.stream().mapToInt(Study::getScoreGender).toArray(),
            all.stream().mapToInt(Study::getScoreRace).toArray(),
            all.stream().mapToInt(Study::getScoreDisability).toArray()
        };

        for (int i = 0; i < SDOH_CATEGORIES.size(); i++) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("determinant", SDOH_CATEGORIES.get(i));
            item.put("field", fields[i]);
            double avg = Arrays.stream(scores[i]).average().orElse(0);
            item.put("averageScore", Math.round(avg * 10.0) / 10.0);
            result.add(item);
        }
        return result;
    }
}
