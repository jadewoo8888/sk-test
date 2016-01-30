package framework.modules.lowvalueitemsmanagement.domain;


public class CategoryManagement implements java.io.Serializable, Cloneable {

	private String pk = "";
	private String categoryName = "";
	private String categoryRemark="";
	private String groupCode = "";
	private String insertTime = "";
	
	private String lastestUpdate = "";
	private String updatePerson = "";
	
	
	public String getPk() {
		return pk;
	}
	public void setPk(String pk) {
		this.pk = pk;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCategoryRemark() {
		return categoryRemark;
	}
	public void setCategoryRemark(String categoryRemark) {
		this.categoryRemark = categoryRemark;
	}
	public String getGroupCode() {
		return groupCode;
	}
	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
	public String getInsertTime() {
		return insertTime;
	}
	public void setInsertTime(String insertTime) {
		this.insertTime = insertTime;
	}
	public String getLastestUpdate() {
		return lastestUpdate;
	}
	public void setLastestUpdate(String lastestUpdate) {
		this.lastestUpdate = lastestUpdate;
	}
	public String getUpdatePerson() {
		return updatePerson;
	}
	public void setUpdatePerson(String updatePerson) {
		this.updatePerson = updatePerson;
	}
	
	
}
