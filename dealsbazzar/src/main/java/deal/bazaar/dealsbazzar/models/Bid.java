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
@Document(collection = "BidDetails")
public class Bid {
    
    @Id
    private String bidId;
    private String productId;
    private String userId;
    private double bidPrice;
    private String bidDate;
    private int bidStock;
    private int bidStatus;
}
