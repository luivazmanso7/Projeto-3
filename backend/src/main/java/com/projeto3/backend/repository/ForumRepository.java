package com.projeto3.backend.repository;

import com.projeto3.backend.model.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForumRepository extends JpaRepository<Forum, Integer> {

    List<Forum> findByTituloContainingIgnoreCase(String titulo);
}
