package com.travel.ctictravel.repositorios;

import com.travel.ctictravel.modelos.Role;
import com.travel.ctictravel.modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> , JpaSpecificationExecutor<Role> {

    Optional<Role> findRoleByNombre(String nombre);


}
