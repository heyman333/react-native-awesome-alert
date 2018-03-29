import { StyleSheet } from "react-native"

export default {
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(49,49,49, 0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: "#rgb(235,233,227)",
    borderRadius: 15,
    width: 275,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth
  },
  checkBox: {
    marginBottom: 10
  },
  checkBoxText: {
    marginLeft: 4,
    alignSelf: "center",
    fontSize: 15,
    justifyContent: "center"
  },
  titleText: {
    fontSize: 17,
    fontWeight: "600",
    padding: 15,
    alignSelf: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  buttonText: {
    fontSize: 17
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderColor: "gray"
  }
}
