package helpdesk.service;

import helpdesk.dto.TicketRequest;
import helpdesk.entity.Category;
import helpdesk.entity.Ticket;
import helpdesk.entity.TicketStatus;
import helpdesk.entity.User;
import helpdesk.repository.CategoryRepository;
import helpdesk.repository.TicketRepository;
import helpdesk.repository.UserRepository;
import org.springframework.stereotype.Service;
import helpdesk.dto.UpdateTicketStatusRequest;
import helpdesk.entity.TicketHistory;
import helpdesk.repository.TicketHistoryRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TicketHistoryRepository ticketHistoryRepository;

    public TicketService(
            TicketRepository ticketRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository,
            TicketHistoryRepository ticketHistoryRepository) {

        this.ticketRepository = ticketRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.ticketHistoryRepository = ticketHistoryRepository;
    }

    public Ticket createTicket(TicketRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Ticket ticket = new Ticket();

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime startOfMonth =
                now.withDayOfMonth(1)
                        .toLocalDate()
                        .atStartOfDay();

        LocalDateTime endOfMonth =
                startOfMonth.plusMonths(1);

        long monthlyCount =
                ticketRepository.countByCreatedAtBetween(
                        startOfMonth,
                        endOfMonth
                ) + 1;

        ticket.setTicketNumber(
                String.format(
                        "TKT-%04d",
                        monthlyCount
                )
        );
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(TicketStatus.OPEN);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());
        ticket.setCategory(category);
        ticket.setCreatedBy(user);

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public Ticket updateTicketStatus(
            Long ticketId,
            UpdateTicketStatusRequest request) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        String oldStatus = ticket.getStatus().name();

        ticket.setStatus(request.getStatus());
        ticket.setUpdatedAt(LocalDateTime.now());

        Ticket updatedTicket = ticketRepository.save(ticket);

        TicketHistory history = new TicketHistory();

        history.setTicket(ticket);
        history.setOldStatus(oldStatus);
        history.setNewStatus(request.getStatus().name());
        history.setRemarks(request.getRemarks());
        history.setChangedAt(LocalDateTime.now());

        ticketHistoryRepository.save(history);

        return updatedTicket;
    }

    public List<TicketHistory> getTicketHistory(Long ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        return ticketHistoryRepository
                .findByTicketIdOrderByChangedAtAsc(ticketId);
    }

    public Ticket closeTicket(Long ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        String oldStatus = ticket.getStatus().name();

        ticket.setStatus(TicketStatus.CLOSED);
        ticket.setUpdatedAt(LocalDateTime.now());

        Ticket updatedTicket = ticketRepository.save(ticket);

        TicketHistory history = new TicketHistory();

        history.setTicket(ticket);
        history.setOldStatus(oldStatus);
        history.setNewStatus(TicketStatus.CLOSED.name());
        history.setRemarks("Ticket Closed");
        history.setChangedAt(LocalDateTime.now());

        ticketHistoryRepository.save(history);

        return updatedTicket;
    }

    public Ticket reopenTicket(Long ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        String oldStatus = ticket.getStatus().name();

        ticket.setStatus(TicketStatus.REOPENED);
        ticket.setUpdatedAt(LocalDateTime.now());

        Ticket updatedTicket = ticketRepository.save(ticket);

        TicketHistory history = new TicketHistory();

        history.setTicket(ticket);
        history.setOldStatus(oldStatus);
        history.setNewStatus(TicketStatus.REOPENED.name());
        history.setRemarks("Ticket Reopened");
        history.setChangedAt(LocalDateTime.now());

        ticketHistoryRepository.save(history);

        return updatedTicket;
    }

    public List<Ticket> getTicketsByUserEmail(
            String email) {

        return ticketRepository
                .findByCreatedByEmail(email);
    }
}