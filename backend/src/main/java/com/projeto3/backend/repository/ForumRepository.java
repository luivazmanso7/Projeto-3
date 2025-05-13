package com.projeto3.backend.repository;

import com.projeto3.backend.model.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Forum, Integer> {}