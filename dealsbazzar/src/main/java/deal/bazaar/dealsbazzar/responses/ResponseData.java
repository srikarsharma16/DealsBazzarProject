package deal.bazaar.dealsbazzar.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Data
public class ResponseData {
    
    private Integer statusCode;
    private Object data;
    private String message;
}