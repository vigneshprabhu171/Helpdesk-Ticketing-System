package helpdesk.controller;

import helpdesk.dto.TicketRequest;
import helpdesk.entity.Ticket;
import helpdesk.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import helpdesk.dto.UpdateTicketStatusRequest;
import helpdesk.entity.TicketHistory;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(
            @RequestBody TicketRequest request) {

        return ResponseEntity.ok(
                ticketService.createTicket(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {

        return ResponseEntity.ok(
                ticketService.getAllTickets()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.getTicketById(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Ticket> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody UpdateTicketStatusRequest request) {

        return ResponseEntity.ok(
                ticketService.updateTicketStatus(id, request)
        );
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<TicketHistory>> getTicketHistory(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.getTicketHistory(id)
        );
    }

    @GetMapping("/user")
    public ResponseEntity<List<Ticket>>
    getTicketsByUserEmail(
            @RequestParam String email) {

        return ResponseEntity.ok(
                ticketService.getTicketsByUserEmail(email)
        );
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<Ticket> closeTicket(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.closeTicket(id)
        );
    }

    @PutMapping("/{id}/reopen")
    public ResponseEntity<Ticket> reopenTicket(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.reopenTicket(id)
        );
    }
}