package com.nscc.apexhealthbackend.repository;

import com.nscc.apexhealthbackend.entity.DataUpload;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataUploadRepository extends JpaRepository <DataUpload,Long> {
//    Will likely stay empty unless we need to put more in here
//    Handles communication between app and db
}
