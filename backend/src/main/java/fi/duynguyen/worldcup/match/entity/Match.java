package fi.duynguyen.worldcup.match.entity;

import fi.duynguyen.worldcup.team.entity.Team;
import fi.duynguyen.worldcup.tournament.entity.Tournament;
import fi.duynguyen.worldcup.tournament.entity.TournamentStage;
import fi.duynguyen.worldcup.venue.entity.Venue;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "match_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "stage_id", nullable = false)
    private TournamentStage stage;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "venue_id", nullable = true)
    private Venue venue;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "home_team_id", nullable = false)
    private Team homeTeam;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "away_team_id", nullable = false)
    private Team awayTeam;

    @Column(name = "match_date", nullable = false)
    private LocalDate matchDate;

    @Column(name = "kickoff_time_utc", nullable = true)
    private LocalTime kickoffTimeUtc;

    @Column(name = "home_score", nullable = true)
    private Integer homeScore;

    @Column(name = "away_score", nullable = true)
    private Integer awayScore;

    @Column(name = "home_xg", nullable = true, precision = 5, scale = 2)
    private BigDecimal homeXg;

    @Column(name = "away_xg", nullable = true, precision = 5, scale = 2)
    private BigDecimal awayXg;

    @Column(name = "status", nullable = true, length = 30)
    private String status;

    @Column(name = "home_shootout_score", nullable = true)
    private Integer homeShootoutScore;

    @Column(name = "away_shootout_score", nullable = true)
    private Integer awayShootoutScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "result_type", nullable = true, length = 20)
    private ResultType resultType;

    public Match() {
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

    public TournamentStage getStage() {
        return stage;
    }

    public void setStage(TournamentStage stage) {
        this.stage = stage;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }

    public LocalDate getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDate matchDate) {
        this.matchDate = matchDate;
    }

    public LocalTime getKickoffTimeUtc() {
        return kickoffTimeUtc;
    }

    public void setKickoffTimeUtc(LocalTime kickoffTimeUtc) {
        this.kickoffTimeUtc = kickoffTimeUtc;
    }

    public Integer getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(Integer homeScore) {
        this.homeScore = homeScore;
    }

    public Integer getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(Integer awayScore) {
        this.awayScore = awayScore;
    }

    public BigDecimal getHomeXg() {
        return homeXg;
    }

    public void setHomeXg(BigDecimal homeXg) {
        this.homeXg = homeXg;
    }

    public BigDecimal getAwayXg() {
        return awayXg;
    }

    public void setAwayXg(BigDecimal awayXg) {
        this.awayXg = awayXg;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getHomeShootoutScore() {
        return homeShootoutScore;
    }

    public void setHomeShootoutScore(Integer homeShootoutScore) {
        this.homeShootoutScore = homeShootoutScore;
    }

    public Integer getAwayShootoutScore() {
        return awayShootoutScore;
    }

    public void setAwayShootoutScore(Integer awayShootoutScore) {
        this.awayShootoutScore = awayShootoutScore;
    }

    public ResultType getResultType() {
        return resultType;
    }

    public void setResultType(ResultType resultType) {
        this.resultType = resultType;
    }
}
