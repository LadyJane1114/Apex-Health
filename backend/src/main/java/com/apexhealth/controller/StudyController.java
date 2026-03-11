package com.apexhealth.controller;

import com.apexhealth.model.Study;
import com.apexhealth.service.StudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class StudyController {

    @Autowired
    private StudyService studyService;

    // GET /api/studies
    // Optional query params: population, status, sdoh, minScore
    @GetMapping("/studies")
    public ResponseEntity<List<Study>> getStudies(
            @RequestParam(required = false) String population,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String sdoh,
            @RequestParam(required = false) Double minScore) {

        List<Study> studies = studyService.filterStudies(population, status, sdoh, minScore);
        return ResponseEntity.ok(studies);
    }

    // GET /api/studies/{id}
    @GetMapping("/studies/{id}")
    public ResponseEntity<Study> getStudyById(@PathVariable Long id) {
        return studyService.getAllStudies().stream()
            .filter(s -> s.getId().equals(id))
            .findFirst()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/kpis
    @GetMapping("/kpis")
    public ResponseEntity<Map<String, Object>> getKpis() {
        return ResponseEntity.ok(studyService.getKpis());
    }

    // GET /api/sdoh-categories
    @GetMapping("/sdoh-categories")
    public ResponseEntity<List<String>> getSdohCategories() {
        return ResponseEntity.ok(StudyService.SDOH_CATEGORIES);
    }

    // GET /api/populations
    @GetMapping("/populations")
    public ResponseEntity<List<String>> getPopulations() {
        return ResponseEntity.ok(StudyService.POPULATIONS);
    }

    // GET /api/sdoh-aggregates - average scores per determinant across all studies
    @GetMapping("/sdoh-aggregates")
    public ResponseEntity<List<Map<String, Object>>> getSdohAggregates() {
        return ResponseEntity.ok(studyService.getSdohAggregates());
    }

    // Health check
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Apex Health API"));
    }
}
