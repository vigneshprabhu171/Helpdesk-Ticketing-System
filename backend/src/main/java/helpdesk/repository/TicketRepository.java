package helpdesk.repository;

import helpdesk.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDateTime;



@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCreatedByEmail(String email);
    long countByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );
}