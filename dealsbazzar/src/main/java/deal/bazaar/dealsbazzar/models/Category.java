package deal.bazaar.dealsbazzar.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
@Document(collection = "Category")
public class Category {
    @Id
    private String categoryId;
    private String productCategory;
    private String productMeasurement;
    
        
    @Override
    public String toString() {
        return "Category [categoryId=" + categoryId + ", productCategory=" + productCategory + ", productMeasurement="
                + productMeasurement + "]";
    }

    

    

}
