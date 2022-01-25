package deal.bazaar.dealsbazzar.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "Payment")
public class Payment {
    @Id
    private String paymentId;
    private String paymentTypeId;
    private double bidderPrice;
}
