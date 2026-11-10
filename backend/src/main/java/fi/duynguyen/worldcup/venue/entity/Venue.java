package fi.duynguyen.worldcup.venue.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "venues")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venue_id")
    private Long id;

    @Column(name = "stadium_name", nullable = false, length = 150)
    private String stadiumName;

    @Column(name = "city", nullable = true, length = 100)
    private String city;

    @Column(name = "country", nullable = true, length = 100)
    private String country;

    @Column(name = "capacity", nullable = true)
    private Integer capacity;

    @Column(name = "latitude", nullable = true, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = true, precision = 9, scale = 6)
    private BigDecimal longitude;

    public Venue() {
    }

    public Long getId() {
        return id;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }
}
