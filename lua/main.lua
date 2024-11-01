local json = require('json')

ANT_PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
KEY_SUB_DOMAIN = "Sub-Domain"
KEY_TRANSACTION_ID = "Transaction-Id"
KEY_TTL = "TTL-Seconds"

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

Templates = Templates or {}
Handlers.add("Templates", Handlers.utils.hasMatchingTag("Action", "Templates"), function(msg)
    ao.send({ Target = msg.From, Data = json.encode(Templates) })
end)

Handlers.add("SetTemplate", Handlers.utils.hasMatchingTag("Action", "SetTemplate"), function(msg)
    local name = msg.Tags.Name
    local txId = msg.Tags.TxId

    if type(name) ~= 'string' or name == "" then
        sendErrorMessage(msg, 'Name is required and must be a string')
        return
    end

    if type(txId) ~= 'string' or txId == "" then
        sendErrorMessage(msg, 'TxId is required and must be a string')
        return
    end

    if msg.From == ao.id then
        Templates[name] = txId
        printData("Templates", Templates)
        ao.send({ Target = msg.From, Data = name .. " Template Added. TxId: " .. txId })
    else
        sendErrorMessage(msg, 'Only the Process Id can set template')
    end
end)

Records = Records or {}

Handlers.add("Record", Handlers.utils.hasMatchingTag("Action", "Record"), function(msg)
    local subdomain = msg[KEY_SUB_DOMAIN]
    if type(subdomain) ~= 'string' or subdomain == "" then
        sendErrorMessage(msg, 'Sub-Domain is required and must be a string')
        return
    end

    local record = Records[subdomain]
    if not record then
        sendErrorMessage(msg, 'Record not found')
        return
    end

    printData("record", record)
    msg.reply({ Data = record })
end)

Handlers.add("UserRecord", Handlers.utils.hasMatchingTag("Action", "UserRecord"), function(msg)
    local walletOwner = msg.Tags and msg.Tags.WalletOwner

    if type(walletOwner) ~= 'string' or walletOwner == "" then
        sendErrorMessage(msg, 'WalletOwner is required and must be a string')
        return
    end

    if not next(Records) then
        sendErrorMessage(msg, 'No records found')
        return
    end

    local userRecords = {}
    for _, record in pairs(Records) do
        if record.Owner and record.Owner == walletOwner then
            table.insert(userRecords, record)
        end
    end

    if #userRecords == 0 then
        sendErrorMessage(msg, 'No records found for the specified wallet')
        return
    end

    msg.reply({ Data = userRecords })
end)

Handlers.add('Remove-Record', Handlers.utils.hasMatchingTag('Action', 'Remove-Record'), function(msg)
    local owner = msg.From
    local subdomain = msg[KEY_SUB_DOMAIN]

    if type(subdomain) ~= 'string' or subdomain == "" then
        sendErrorMessage(msg, 'Sub-Domain is required and must be a string')
        return
    end

    local record = Records[subdomain]
    if not record then
        sendErrorMessage(msg, 'Record not found')
        return
    end

    if record.Owner ~= owner then
        sendErrorMessage(msg, 'Only the owner can remove the record')
        return
    end

    Records[subdomain] = nil

    ao.send({
        Target = ANT_PROCESS_ID,
        Action = "Remove-Record",
        [KEY_SUB_DOMAIN] = subdomain
    })

    msg.reply({ Data = "Subdomain Record Removed" })
    printData("Subdomain Record Removed", record)
end)

Handlers.add('Set-Record', Handlers.utils.hasMatchingTag('Action', 'Set-Record'), function(msg)
    local owner = msg.From
    local subdomain = msg[KEY_SUB_DOMAIN]
    local transactionId = msg[KEY_TRANSACTION_ID]
    local ttl = msg[KEY_TTL] or "900" -- Default to 900 if not provided
    local username = msg.Tags.Username or "Nameless"
    local description = msg.Tags.Description or ""
    local links = msg.Tags.Links or ""
    local twitter = msg.Tags.Twitter or ""
    local tiktok = msg.Tags.Tiktok or ""
    local instagram = msg.Tags.Instagram or ""
    local facebook = msg.Tags.Facebook or ""
    local linkedin = msg.Tags.Linkedin or ""

    if type(subdomain) ~= 'string' or subdomain == "" then
        sendErrorMessage(msg, 'Sub-Domain is required and must be a string')
        return
    end

    if type(transactionId) ~= 'string' or transactionId == "" then
        sendErrorMessage(msg, 'Transaction-Id is required and must be a string')
        return
    end

    -- Check if subdomain already exists and verify ownership
    if Records[subdomain] then
        if Records[subdomain].Owner ~= owner then
            sendErrorMessage(msg, 'Subdomain already exists and belongs to another owner')
            return
        end
        -- Apply the update if the owner is the same
    end

    ao.send({
        Target = ANT_PROCESS_ID,
        Action = "Set-Record",
        [KEY_SUB_DOMAIN] = subdomain,
        [KEY_TRANSACTION_ID] = transactionId,
        [KEY_TTL] = ttl
    })

    local newRecord = {
        Owner = owner,
        Subdomain = subdomain,
        TransactionId = transactionId,
        TTL = ttl,
        Username = username,
        Description = description,
        Links = links,
        Twitter = twitter,
        Tiktok = tiktok,
        Instagram = instagram,
        Facebook = facebook,
        Linkedin = linkedin
    }
    Records[subdomain] = newRecord
    printData("newRecord", newRecord)
end)

Handlers.add('Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Set-Record-Notice'), function(msg)
    printData("Set-Record-Notice", msg.Data)
end)

Handlers.add('Invalid-Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Invalid-Set-Record-Notice'),
    function(msg)
        printData("Invalid-Set-Record-Notice", msg.Data)
    end)

Handlers.add('Invalid-Remove-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Invalid-Remove-Record-Notice'),
    function(msg)
        printData("Invalid-Remove-Record-Notice", msg.Data)
    end)
