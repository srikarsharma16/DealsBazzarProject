package deal.bazaar.dealsbazzar.models;

import java.util.List;

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
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString

//@Document("user")
public class SystemUser {
	@Id
	private String userId;

	private String name;
	private String email;
	private String password;
	private long phone;
	private String address;
	// @JsonFormat(pattern = "yyyy-MM-dd")
	private String dob;
	private Boolean isActive;

}
