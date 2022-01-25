package deal.bazaar.dealsbazzar.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
@Document(collection = "OrderDetails")
public class Order {
    
    @Id
    private String orderId;
    private String bidId;
    private String paymentId;
    private String userName;
    private String orderDate;
    private String orderStatus;
}
