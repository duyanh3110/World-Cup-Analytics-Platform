package fi.duynguyen.worldcup.tournament.entity;

import fi.duynguyen.worldcup.player.entity.Player;
import fi.duynguyen.worldcup.team.entity.Team;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "tournament_squads")
public class TournamentSquad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tournament_squad_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(name = "shirt_number", nullable = true)
    private Integer shirtNumber;

    @Column(name = "club_team", nullable = true, length = 150)
    private String clubTeam;

    @Column(name = "international_caps_snapshot", nullable = true)
    private Integer internationalCapsSnapshot;

    @Column(name = "international_goals_snapshot", nullable = true)
    private Integer internationalGoalsSnapshot;

    @Column(name = "international_stats_as_of", nullable = true)
    private LocalDate internationalStatsAsOf;

    @Column(name = "market_value_eur", nullable = true)
    private Long marketValueEur;

    public TournamentSquad() {
    }

    public Long getId() {
        return id;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Integer getShirtNumber() {
        return shirtNumber;
    }

    public void setShirtNumber(Integer shirtNumber) {
        this.shirtNumber = shirtNumber;
    }

    public String getClubTeam() {
        return clubTeam;
    }

    public void setClubTeam(String clubTeam) {
        this.clubTeam = clubTeam;
    }

    public Integer getInternationalCapsSnapshot() {
        return internationalCapsSnapshot;
    }

    public void setInternationalCapsSnapshot(Integer internationalCapsSnapshot) {
        this.internationalCapsSnapshot = internationalCapsSnapshot;
    }

    public Integer getInternationalGoalsSnapshot() {
        return internationalGoalsSnapshot;
    }

    public void setInternationalGoalsSnapshot(Integer internationalGoalsSnapshot) {
        this.internationalGoalsSnapshot = internationalGoalsSnapshot;
    }

    public LocalDate getInternationalStatsAsOf() {
        return internationalStatsAsOf;
    }

    public void setInternationalStatsAsOf(LocalDate internationalStatsAsOf) {
        this.internationalStatsAsOf = internationalStatsAsOf;
    }

    public Long getMarketValueEur() {
        return marketValueEur;
    }

    public void setMarketValueEur(Long marketValueEur) {
        this.marketValueEur = marketValueEur;
    }
}
