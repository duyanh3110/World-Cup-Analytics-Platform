package fi.duynguyen.worldcup.team.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fi.duynguyen.worldcup.common.exception.NotFoundException;
import fi.duynguyen.worldcup.match.repository.MatchRepository;
import fi.duynguyen.worldcup.team.entity.Team;
import fi.duynguyen.worldcup.team.repository.TeamRepository;

@Service
public class TeamService {

  private final TeamRepository teamRepository;
  private final MatchRepository matchRepository;

  public TeamService(TeamRepository teamRepository, MatchRepository matchRepository) {
    this.teamRepository = teamRepository;
    this.matchRepository = matchRepository;
  }

  public Page<Team> getAllTeams(Pageable pageable) {
    return teamRepository.findAll(pageable);
  }

  public Team getTeamById(Long id) {
    return teamRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Team not found with id: " + id));
  }

  public Map<String, Long> getTeamOverview(Long id) {
    Team team = getTeamById(id);

    Long recordedMatches = matchRepository.countMatchesByTeam(team.getId(), "Completed");
    Long recordedGoals = matchRepository.sumGoalsByTeam(team.getId(), "Completed");

    Map<String, Long> overview = new HashMap<>();
    overview.put("recordedMatches", recordedMatches);
    overview.put("recordedGoals", recordedGoals);
    return overview;
  }
}
