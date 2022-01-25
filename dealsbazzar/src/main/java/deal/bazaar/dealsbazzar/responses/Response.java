package deal.bazaar.dealsbazzar.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Response {
    int code;
    String msg;
    Object obj;
   
}