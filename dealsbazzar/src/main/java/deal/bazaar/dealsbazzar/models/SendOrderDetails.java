package deal.bazaar.dealsbazzar.models;

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
public class SendOrderDetails {
    private String orderId;
    private String bidId;
    private String paymentId;
    private int stock;
    private double bidderPrice;
    private String productId;
    private String userName;
    private String orderDate;
    private String orderStatus;
}
