package fi.duynguyen.worldcup.statistics.entity;

import fi.duynguyen.worldcup.match.entity.Match;
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
import java.math.BigDecimal;

@Entity
@Table(name = "match_team_stats")
public class MatchTeamStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "match_team_stat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Column(name = "possession_pct", nullable = true, precision = 5, scale = 2)
    private BigDecimal possessionPct;

    @Column(name = "total_shots", nullable = true)
    private Integer totalShots;

    @Column(name = "shots_on_target", nullable = true)
    private Integer shotsOnTarget;

    @Column(name = "corners", nullable = true)
    private Integer corners;

    @Column(name = "fouls", nullable = true)
    private Integer fouls;

    @Column(name = "offsides", nullable = true)
    private Integer offsides;

    @Column(name = "saves", nullable = true)
    private Integer saves;

    @Column(name = "data_source", nullable = true, length = 200)
    private String dataSource;

    @Column(name = "source_updated_text", nullable = true, length = 100)
    private String sourceUpdatedText;

    @Column(name = "source_revision", nullable = true, length = 40)
    private String sourceRevision;

    public MatchTeamStats() {
    }

    public Long getId() {
        return id;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public BigDecimal getPossessionPct() {
        return possessionPct;
    }

    public void setPossessionPct(BigDecimal possessionPct) {
        this.possessionPct = possessionPct;
    }

    public Integer getTotalShots() {
        return totalShots;
    }

    public void setTotalShots(Integer totalShots) {
        this.totalShots = totalShots;
    }

    public Integer getShotsOnTarget() {
        return shotsOnTarget;
    }

    public void setShotsOnTarget(Integer shotsOnTarget) {
        this.shotsOnTarget = shotsOnTarget;
    }

    public Integer getCorners() {
        return corners;
    }

    public void setCorners(Integer corners) {
        this.corners = corners;
    }

    public Integer getFouls() {
        return fouls;
    }

    public void setFouls(Integer fouls) {
        this.fouls = fouls;
    }

    public Integer getOffsides() {
        return offsides;
    }

    public void setOffsides(Integer offsides) {
        this.offsides = offsides;
    }

    public Integer getSaves() {
        return saves;
    }

    public void setSaves(Integer saves) {
        this.saves = saves;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getSourceUpdatedText() {
        return sourceUpdatedText;
    }

    public void setSourceUpdatedText(String sourceUpdatedText) {
        this.sourceUpdatedText = sourceUpdatedText;
    }

    public String getSourceRevision() {
        return sourceRevision;
    }

    public void setSourceRevision(String sourceRevision) {
        this.sourceRevision = sourceRevision;
    }
}
