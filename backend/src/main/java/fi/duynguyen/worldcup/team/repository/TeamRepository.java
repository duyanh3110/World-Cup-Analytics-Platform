package fi.duynguyen.worldcup.team.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fi.duynguyen.worldcup.team.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {

}
