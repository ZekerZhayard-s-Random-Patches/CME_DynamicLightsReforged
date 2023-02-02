
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "DynamicLightsReforged_<clinit>": {
            "target": {
                "type": "METHOD",
                "class": "me/lambdaurora/lambdynlights/DynamicLightsReforged",
                "methodName": "<clinit>",
                "methodDesc": "()V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTSTATIC && node.owner.equals("me/lambdaurora/lambdynlights/DynamicLightsReforged") && node.name.equals(ASMAPI.mapField("dynamicLightSources")) && node.desc.equals("Ljava/util/Set;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "java/util/concurrent/ConcurrentHashMap", "newKeySet", "()Ljava/util/concurrent/ConcurrentHashMap$KeySetView;", false));
                    }
                }
                return mn;
            }
        }
    }
}