package fi.duynguyen.worldcup.match.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fi.duynguyen.worldcup.match.entity.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {

  @Query("""
      SELECT COUNT(m)
      FROM Match m
      WHERE m.status = :status
        AND (m.homeTeam.id = :teamId OR m.awayTeam.id = :teamId)
      """)
  long countMatchesByTeam(@Param("teamId") Long teamId, @Param("status") String status);

  @Query("""
      SELECT SUM(
        CASE
          WHEN m.homeTeam.id = :teamId THEN m.homeScore
          ELSE m.awayScore
        END
      )
      FROM Match m
      WHERE m.status = :status
        AND (m.homeTeam.id = :teamId OR m.awayTeam.id = :teamId)
      """)
  Long sumGoalsByTeam(
      @Param("teamId") Long teamId,
      @Param("status") String status);
}
