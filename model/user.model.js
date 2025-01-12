const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    first_name : {
        type : "String",
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    contact_number : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        default : "https://s3-alpha-sig.figma.com/img/a678/aed9/e259b9de82f3f0845448634759bf6f1f?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fy6v-Hxht1YMJVrZDxHqG~ZuW13sl1YtWXU1xZoR-WvjYIeM~IQv3V2M6KTZc4rS~70rdi~V~aYiJKY6ytrH43OBXzAQHpjsGVsjsCA5G5piNZ4IJEoiyQyx36YgH3xR6hzoWsP5nbJXILUO-MUFf04RgpqljFtEivC~nTCnpkSnWXEi4nUOKluhOljJnSrXYmVkBLZShjgpo4KqPcksmiTEHg5is8jTKlf5OvnpIb9tDDAWQWlzGPN3mgnAhFNOCSCzvW7JUq06Di6HMmrPKZSIHzHKqgorpQPRVANEonjmjLo3uk5Qc1~WZljICyUISP3mZ85VGazVQb6~XNM-NA__"
    }
})
UserSchema.index({ first_name: 'text', last_name: 'text' });
const User = mongoose.model("User", UserSchema)

module.exports = User