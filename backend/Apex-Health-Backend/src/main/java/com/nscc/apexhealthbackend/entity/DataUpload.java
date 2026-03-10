package com.nscc.apexhealthbackend.entity;

import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Data
@Entity
public class DataUpload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    A record in the spreadsheet
    private Long record_id;

//    A column in the spreadsheet
    private String column_name;

//    The data in the column of the spreadsheet
    private String column_value;

    private String file_name;

//    optional - if Excel has multiple sheets
    private String sheet_name;

//    who uploaded the file
    private String uploaded_by;

//    timestamp
    private LocalDateTime uploaded_at;

}
