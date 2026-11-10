package fi.duynguyen.worldcup.match.entity;

import fi.duynguyen.worldcup.team.entity.Team;
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
@Table(name = "match_events")
public class MatchEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "team_id", nullable = true)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "tournament_squad_id", nullable = true)
    private TournamentSquad squad;

    @Column(name = "minute", nullable = true)
    private Integer minute;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 50)
    private EventType eventType;

    @Enumerated(EnumType.STRING)
    @Column(name = "period", nullable = true, length = 30)
    private MatchPeriod period;

    @Column(name = "added_time", nullable = true)
    private Integer addedTime;

    @Column(name = "source_time_text", nullable = true, length = 100)
    private String sourceTimeText;

    @Enumerated(EnumType.STRING)
    @Column(name = "goal_method", nullable = true, length = 20)
    private GoalMethod goalMethod;

    @Column(name = "data_source", nullable = true, length = 200)
    private String dataSource;

    @Column(name = "source_revision", nullable = true, length = 40)
    private String sourceRevision;

    public MatchEvent() {
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

    public TournamentSquad getSquad() {
        return squad;
    }

    public void setSquad(TournamentSquad squad) {
        this.squad = squad;
    }

    public Integer getMinute() {
        return minute;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public MatchPeriod getPeriod() {
        return period;
    }

    public void setPeriod(MatchPeriod period) {
        this.period = period;
    }

    public Integer getAddedTime() {
        return addedTime;
    }

    public void setAddedTime(Integer addedTime) {
        this.addedTime = addedTime;
    }

    public String getSourceTimeText() {
        return sourceTimeText;
    }

    public void setSourceTimeText(String sourceTimeText) {
        this.sourceTimeText = sourceTimeText;
    }

    public GoalMethod getGoalMethod() {
        return goalMethod;
    }

    public void setGoalMethod(GoalMethod goalMethod) {
        this.goalMethod = goalMethod;
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
