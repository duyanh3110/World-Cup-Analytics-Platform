package fi.duynguyen.worldcup.team.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.duynguyen.worldcup.common.dto.PageResponse;
import fi.duynguyen.worldcup.team.dto.TeamOverviewResponse;
import fi.duynguyen.worldcup.team.dto.TeamResponse;
import fi.duynguyen.worldcup.team.entity.Team;
import fi.duynguyen.worldcup.team.service.TeamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

  private final TeamService teamService;

  public TeamController(TeamService teamService) {
    this.teamService = teamService;
  }

  @GetMapping()
  public PageResponse<TeamResponse> getAllTeams(
      @PageableDefault(size = 10, sort = "teamName", direction = Sort.Direction.ASC) Pageable pageable) {
    Page<TeamResponse> result = teamService.getAllTeams(pageable)
        .map(this::toResponse);

    return new PageResponse<>(result.getContent(), result.getNumber(), result.getSize(), result.getTotalElements(),
        result.getTotalPages());
  }

  @GetMapping("/{id}")
  public TeamResponse getTeamById(@PathVariable Long id) {
    Team team = teamService.getTeamById(id);

    return toResponse(team);
  }

  @GetMapping("/{id}/overview")
  public TeamOverviewResponse getTeamOverview(@PathVariable Long id) {
    Map<String, Long> overview = teamService.getTeamOverview(id);

    return new TeamOverviewResponse(overview.get("recordedMatches"), overview.get("recordedGoals"));
  }

  private TeamResponse toResponse(Team team) {
    return new TeamResponse(
        team.getId(),
        team.getTeamName(),
        team.getFifaCode(),
        team.getConfederation());
  }

}
