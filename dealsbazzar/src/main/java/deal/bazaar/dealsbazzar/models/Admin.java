package deal.bazaar.dealsbazzar.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "Admin_tb")
public class Admin {
    @Id
    private String userName;
    private String password;
}

