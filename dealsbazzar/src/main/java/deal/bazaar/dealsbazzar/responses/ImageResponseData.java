package deal.bazaar.dealsbazzar.responses;

import java.util.List;

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
public class ImageResponseData {

	private String imageBase64;
	private String imagepath;
	private List<String> imageBase64List;
	private List<String> imageList;
	
}
