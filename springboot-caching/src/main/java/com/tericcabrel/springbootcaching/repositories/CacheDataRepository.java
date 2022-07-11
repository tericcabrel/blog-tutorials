package com.tericcabrel.springbootcaching.repositories;

import com.tericcabrel.springbootcaching.models.CacheData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CacheDataRepository extends CrudRepository<CacheData, String> {

    List<CacheData> findByIdContainingIgnoreCase(String keyword);
}
