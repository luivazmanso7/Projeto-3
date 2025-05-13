package com.projeto3.backend.repository;

import com.projeto3.backend.model.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostagemRepository extends JpaRepository<Postagem, Integer> {}