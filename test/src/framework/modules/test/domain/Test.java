package framework.modules.test.domain;

import framework.sys.foreignkeytranslation.FK;
import framework.sys.foreignkeytranslation.Ref;

public class Test implements java.io.Serializable,Cloneable {

	private String id;
	
	private String name;
	@FK(ref=Ref.CustomHandle,customvalue="1,男##0,女")
	private String sex;

	//翻译字段
	private String sexDisplay = "";
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSexDisplay() {
		return sexDisplay;
	}

	public void setSexDisplay(String sexDisplay) {
		this.sexDisplay = sexDisplay;
	}
	
	
}
