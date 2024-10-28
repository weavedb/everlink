ANT_PROCESS_ID = ANT_PROCESS_ID or "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
MAIN_PROCESS_ID = MAIN_PROCESS_ID or "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"

local printData = function(k, v)
    local _data = {
        Key = k,
        Value = v
    }
    print(_data)
end

local sendErrorMessage = function(msg, err, target)
    if not target then
        ao.send({ Target = msg.From, Error = "true", Data = err })
        printData("Error", "Target" .. " " .. msg.From .. " " .. err)
    else
        ao.send({ Target = target, Error = "true", Data = err })
        printData("Error", "Target" .. " " .. target .. " " .. err)
    end
end

Handlers.add("SetMainProcessId", Handlers.utils.hasMatchingTag("Action", "SetMainProcessId"), function(msg)

end)

Handlers.add("SetAntProcessId", Handlers.utils.hasMatchingTag("Action", "SetAntProcessId"), function(msg)

end)

Handlers.add("GetMainProcessId", Handlers.utils.hasMatchingTag("Action", "GetMainProcessId"), function(msg)

end)

Handlers.add("GetAntProcessId", Handlers.utils.hasMatchingTag("Action", "GetAntProcessId"), function(msg)

end)
