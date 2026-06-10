package helpdesk.service;

import helpdesk.dto.FeedbackRequest;
import helpdesk.entity.Feedback;
import helpdesk.entity.Ticket;
import helpdesk.entity.User;
import helpdesk.repository.FeedbackRepository;
import helpdesk.repository.TicketRepository;
import helpdesk.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public FeedbackService(
            FeedbackRepository feedbackRepository,
            TicketRepository ticketRepository,
            UserRepository userRepository) {

        this.feedbackRepository = feedbackRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public Feedback createFeedback(
            FeedbackRequest request) {

        Ticket ticket = ticketRepository.findById(
                        request.getTicketId())
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        User user = userRepository.findById(
                        request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Feedback feedback = new Feedback();

        feedback.setRating(request.getRating());
        feedback.setComments(request.getComments());
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setTicket(ticket);
        feedback.setUser(user);

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public Double getAverageRating() {

        List<Feedback> feedbackList =
                feedbackRepository.findAll();

        if (feedbackList.isEmpty()) {
            return 0.0;
        }

        return feedbackList.stream()
                .mapToInt(Feedback::getRating)
                .average()
                .orElse(0.0);
    }

    public Long getTotalFeedback() {

        return feedbackRepository.count();
    }

    public List<Feedback> getFeedbackByTicket(
            Long ticketId) {

        return feedbackRepository
                .findByTicketId(ticketId);
    }

    public boolean feedbackExists(
            Long ticketId) {

        return feedbackRepository
                .existsByTicketId(ticketId);
    }

}