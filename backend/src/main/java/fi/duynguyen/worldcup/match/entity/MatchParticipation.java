package fi.duynguyen.worldcup.match.entity;

import fi.duynguyen.worldcup.tournament.entity.TournamentSquad;
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

@Entity
@Table(name = "match_participations")
public class MatchParticipation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "match_participation_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tournament_squad_id", nullable = false)
    private TournamentSquad squad;

    @Column(name = "is_starting_xi", nullable = true)
    private Boolean startingXi;

    @Column(name = "played", nullable = true)
    private Boolean played;

    @Column(name = "minutes_played", nullable = true)
    private Integer minutesPlayed;

    @Column(name = "tactical_position", nullable = true, length = 30)
    private String tacticalPosition;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_quality", nullable = true, length = 20)
    private ParticipationDataQuality dataQuality;

    @Column(name = "data_source", nullable = true, length = 200)
    private String dataSource;

    @Column(name = "source_revision", nullable = true, length = 40)
    private String sourceRevision;

    public MatchParticipation() {
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

    public TournamentSquad getSquad() {
        return squad;
    }

    public void setSquad(TournamentSquad squad) {
        this.squad = squad;
    }

    public Boolean getStartingXi() {
        return startingXi;
    }

    public void setStartingXi(Boolean startingXi) {
        this.startingXi = startingXi;
    }

    public Boolean getPlayed() {
        return played;
    }

    public void setPlayed(Boolean played) {
        this.played = played;
    }

    public Integer getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(Integer minutesPlayed) {
        this.minutesPlayed = minutesPlayed;
    }

    public String getTacticalPosition() {
        return tacticalPosition;
    }

    public void setTacticalPosition(String tacticalPosition) {
        this.tacticalPosition = tacticalPosition;
    }

    public ParticipationDataQuality getDataQuality() {
        return dataQuality;
    }

    public void setDataQuality(ParticipationDataQuality dataQuality) {
        this.dataQuality = dataQuality;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getSourceRevision() {
        return sourceRevision;
    }

    public void setSourceRevision(String sourceRevision) {
        this.sourceRevision = sourceRevision;
    }
}
