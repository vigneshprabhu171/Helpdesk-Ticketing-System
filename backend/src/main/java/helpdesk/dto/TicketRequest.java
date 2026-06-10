package helpdesk.dto;

import helpdesk.entity.Priority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketRequest {

    private String title;

    private String description;

    private Priority priority;

    private Long categoryId;

    private Long userId;
}