package com.tericcabrel.hotel.repositories;

import com.tericcabrel.hotel.models.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<Address, Integer> {

}
