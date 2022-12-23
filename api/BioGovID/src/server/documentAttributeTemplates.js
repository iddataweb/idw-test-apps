module.exports = {
  attributeTemplates: {
    passport: function(args) {
      return (
        [
          {
            attributeType: "FullName",
            values: {
              fname: args.firstName,
              mname: "",
              lname: args.lastName
            }
          },
          {
            attributeType: "CameraSnapshot",
            values: {
              cameraSnapshot: args.documents.urls.cameraSnapshot
            }
          },
          {
            attributeType: "PassportImage",
            values: {
              passportImage: args.documents.urls.passportImage
            }
          },
          {
            attributeType: "InternationalTelephone",
            values: {
              dialCode: args.dialCode || "1",
              telephone: args.phoneNumber
            }
          }
        ]
      )
    },
    idcard: function (args) {
      return (
        [
          {
            attributeType: "FullName",
            values: {
              fname: args.firstName,
              mname: "",
              lname: args.lastName
            }
          },
          {
            attributeType: "CameraSnapshot",
            values: {
              cameraSnapshot: args.documents.urls.cameraSnapshot
            }
          },
          {
            attributeType: "InternationalTelephone",
            values: {
              dialCode: args.dialCode || "1",
              telephone: args.phoneNumber,
            },
          },
          {
            attributeType: "IDCardImages",
            values: {
              frontImage: args.documents.urls.frontImage,
              backImage: args.documents.urls.backImage
            }
          }
        ]
      )
    },
    license: function (args) {
      return (
        [
          {
            attributeType: "DriversLicenseImages",
            values: {
              frontImage: args.documents.urls.frontImage,
              backImage: args.documents.urls.backImage
            },
          },
          {
            attributeType: "CameraSnapshot",
            values: {
              cameraSnapshot: args.documents.urls.cameraSnapshot
            },
          },
          {
            attributeType: "FullName",
            values: {
              fname: args.firstName,
              lname: args.lastName,
              mname: "",
            },
          },
          {
            attributeType: "InternationalTelephone",
            values: {
              dialCode: args.dialCode || "1",
              telephone: args.phoneNumber,
            },
          },
          {
            attributeType: "Country",
            values: {
              country: args.country
            }
          }
        ]
      )
    }
  }
}