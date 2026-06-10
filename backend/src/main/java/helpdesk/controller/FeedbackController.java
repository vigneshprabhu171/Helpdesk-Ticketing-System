package helpdesk.controller;

import helpdesk.dto.FeedbackRequest;
import helpdesk.entity.Feedback;
import helpdesk.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(
            FeedbackService feedbackService) {

        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(
            @RequestBody FeedbackRequest request) {

        return ResponseEntity.ok(
                feedbackService.createFeedback(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {

        return ResponseEntity.ok(
                feedbackService.getAllFeedback()
        );
    }

    @GetMapping("/average-rating")
    public ResponseEntity<Double>
    getAverageRating() {

        return ResponseEntity.ok(
                feedbackService.getAverageRating()
        );
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalFeedback() {

        return ResponseEntity.ok(
                feedbackService.getTotalFeedback()
        );
    }

    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<List<Feedback>>
    getFeedbackByTicket(
            @PathVariable Long ticketId) {

        return ResponseEntity.ok(
                feedbackService
                        .getFeedbackByTicket(ticketId)
        );
    }

    @GetMapping("/exists/{ticketId}")
    public ResponseEntity<Boolean>
    feedbackExists(
            @PathVariable Long ticketId) {

        return ResponseEntity.ok(
                feedbackService.feedbackExists(ticketId)
        );
    }
}